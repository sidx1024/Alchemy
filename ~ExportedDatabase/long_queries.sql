/* class time table */
use time_table_v1;
use timetable_laravel;

SELECT count(*) from time_table;

/* class time table */
SELECT time_table.*, course.alias, faculty.name
FROM time_table, course_offered, course, faculty, course_offered_faculty
WHERE time_table.course_offered_id = course_offered.id 
	AND course_offered.class_id = 2
	AND course_offered.course_id = course.id
    AND course_offered.id = course_offered_faculty.course_offered_id
    AND course_offered_faculty.faculty_id = faculty.id 
ORDER BY day;

/* faculty time table */    
SELECT time_table.*, faculty.name
FROM time_table, course_offered_faculty, faculty
WHERE time_table.course_offered_id = course_offered_faculty.course_offered_id
AND course_offered_faculty.faculty_id = faculty.id
AND faculty.id = 3 
ORDER BY day;

/* get course scheme for lecture */
SELECT substr(scheme,1,1)
FROM course
WHERE course.id = 1;

/* count course usage */
SELECT count(*)
FROM time_table, course, course_offered
WHERE course_offered.id = time_table.course_offered_id
AND course_offered.id = course.id
AND course.id = 1;

use time_table_v1;

SELECT time_table.*, course.alias, faculty.name, faculty.alias
FROM time_table, course_offered, course, faculty, course_offered_faculty
WHERE time_table.course_offered_id = course_offered.id 
	AND course_offered.course_id = course.id
    AND course_offered.id = course_offered_faculty.course_offered_id
    AND course_offered_faculty.faculty_id = faculty.id
	AND course_offered.class_id IN (
		SELECT id 
		FROM class 
		WHERE class.division = 3 AND class.level = 2    
    )
ORDER BY day;

START TRANSACTION;
ROLLBACK;

DELETE
FROM time_table 
WHERE course_offered_id	IN 
	(SELECT id
	FROM course_offered 
	WHERE class_id IN 
		(SELECT id 
		FROM class 
		WHERE class.division = 3 AND class.level = 2
		)
	);

SELECT * 
FROM time_table 
WHERE course_offered_id	IN 
	(SELECT id
	FROM course_offered 
	WHERE class_id IN 
		(SELECT id 
		FROM class 
		WHERE class.division = 3 AND class.level = 2
		)
	);

SELECT  *
FROM  class a 
        INNER JOIN course_offered b
            ON a.id = b.class_id
WHERE   b.class_id = (SELECT id FROM class WHERE class.division = 3 AND class.level = 2);
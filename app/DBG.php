<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class DBG extends Model
{
    //
    private $total_time;
    public static function start() {
        $total_time = 0;
        DB::flushQueryLog();
        DB::connection()->enableQueryLog();
        return "SQL Time Count started.";
    }

    public static function stop() {
        $log = DB::getQueryLog();
        $total_time = 0;
        foreach ($log as $value) {
            $total_time += $value['time'];
        }
        return "SQL Execution time : " . $total_time . " ms (" . sizeof($log) . " queries).";
    }

    public static function tableSizes() {
        $output = "";
        $output .= CourseOffered::count() . " - CourseOffered \n";
        $output .= CourseOfferedFaculty::count() . " - CourseOfferedFaculty \n";
        $output .= TimeTable::count() . " - TimeTable \n";
        $output .= HistoryCourseOffered::count() . " - HistoryCourseOffered \n";
        $output .= HistoryCourseOfferedFaculty::count() . " - HistoryCourseOfferedFaculty \n";
        $output .= HistoryTimeTable::count() . " - HistoryTimeTable \n";
        return $output;
    }
}

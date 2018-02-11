<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if (class_exists('Vluzrmos\Tinker\TinkerServiceProvider')) {
            $this->app->register('Vluzrmos\Tinker\TinkerServiceProvider');
        }
        if ($this->app->environment() == 'local') {
            if (class_exists('Wn\Generators\CommandsServiceProvider')) {
                $this->app->register('Wn\Generators\CommandsServiceProvider');
            }
        }
    }
}

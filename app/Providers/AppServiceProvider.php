<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\StudentService;
use App\Services\IStudentService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IStudentService::class, StudentService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

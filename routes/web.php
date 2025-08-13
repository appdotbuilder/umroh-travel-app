<?php

use App\Http\Controllers\UmrohPackageController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page with featured umroh packages
Route::get('/', [WelcomeController::class, 'index'])->name('home');

// Umroh packages routes
Route::controller(UmrohPackageController::class)->group(function () {
    Route::get('/packages', 'index')->name('packages.index');
    Route::get('/packages/{package}', 'show')->name('packages.show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

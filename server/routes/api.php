<?php

use App\Http\Controllers\Api\DonorController;
use App\Http\Controllers\Api\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::controller(DonorController::class)->group(function () {
    Route::get('/donors', 'index')->name('donor.index');
    Route::post('/newdonor', 'store')->name('donor.store');
    Route::get('/donor/{id}', 'show')->name('donor.show');
    Route::put('/editdonor/{id}', 'update')->name('donor.update');
    Route::delete('/delete/{id}', 'destroy')->name('donor.destroy');
});


Route::group(["middleware" => "api", "profix" => "auth"], function () {
    Route::post('/login', [LoginController::class, 'login'])->name('login');
    Route::post('/register', [LoginController::class, 'register'])->name('register');
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    Route::post('/profile', [LoginController::class, 'profile'])->name('profile');
});

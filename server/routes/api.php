<?php

use App\Http\Controllers\Api\DonorController;
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

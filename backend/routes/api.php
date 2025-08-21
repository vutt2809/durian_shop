<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\CartController;

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\MerchantController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/forgot', [AuthController::class, 'forgot']);
    Route::post('/reset', [AuthController::class, 'reset']);
});

// Public product routes
Route::prefix('product')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id_or_slug}', [ProductController::class, 'show']);
    
    // Admin only routes
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
        Route::put('/{id}/toggle', [ProductController::class, 'toggleActive']);
    });
});

// Public category routes
Route::get('/category', [CategoryController::class, 'index']);
Route::get('/category/{id}', [CategoryController::class, 'show']);

// Public contact route
Route::post('/contact', [ContactController::class, 'store']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });

    // User routes
    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::put('/', [UserController::class, 'update']);
        Route::put('/password', [UserController::class, 'updatePassword']);
    });

    // Cart routes
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index']);
        Route::post('/', [CartController::class, 'store']);
        Route::put('/{id}', [CartController::class, 'update']);
        Route::delete('/{id}', [CartController::class, 'destroy']);
        Route::delete('/', [CartController::class, 'clear']);
    });

    // Order routes
    Route::prefix('order')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::post('/', [OrderController::class, 'store']);
        
        // Admin only - get all orders (phải đặt trước /{id})
        Route::middleware(['auth:sanctum', 'admin'])->group(function () {
            Route::get('/all', [OrderController::class, 'all']);
            Route::put('/{id}/status', [OrderController::class, 'updateStatus']);
        });
        
        Route::get('/{id}', [OrderController::class, 'show']);
        Route::put('/{id}/cancel', [OrderController::class, 'cancel']);
    });

    // Admin only routes
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        // Category management
        Route::prefix('category')->group(function () {
            Route::post('/', [CategoryController::class, 'store']);
            Route::put('/{id}', [CategoryController::class, 'update']);
            Route::delete('/{id}', [CategoryController::class, 'destroy']);
        });

        // User management
        Route::prefix('users')->group(function () {
            Route::get('/', [UserController::class, 'all']);
            Route::put('/{id}/role', [UserController::class, 'updateRole']);
            Route::delete('/{id}', [UserController::class, 'destroy']);
        });

        // Merchant management
        Route::prefix('merchants')->group(function () {
            Route::get('/', [MerchantController::class, 'index']);
            Route::post('/', [MerchantController::class, 'store']);
            Route::put('/{id}', [MerchantController::class, 'update']);
            Route::delete('/{id}', [MerchantController::class, 'destroy']);
            Route::put('/{id}/approve', [MerchantController::class, 'approve']);
        });
    });
});

// Catch-all route for undefined API endpoints
Route::fallback(function () {
    return response()->json(['error' => 'No API route found'], 404);
});

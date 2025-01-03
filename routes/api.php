<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\ExamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

Route::post('/create/user', function (Request $request) {
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8',
    ]);

    // Hash the password before saving
    $validatedData['password'] = bcrypt($validatedData['password']);

    // Create the user
    $user = User::create($validatedData);

    return response()->json(['data' => $user], 201);
});

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = Auth::attempt($credentials);

    if (!$user) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $token = $request->user()->createToken(env('APP_KEY'));
    return ['token' => $token->plainTextToken];
});

Route::middleware('auth:sanctum')->group(function () {
    // Student Routes
    Route::prefix('students')->group(function () {
        Route::post('/', [StudentController::class, 'store']);
        Route::put('/{id}', [StudentController::class, 'update']);
        Route::delete('/{id}', [StudentController::class, 'destroy']);
        Route::get('/', [StudentController::class, 'index']);
        Route::get('/{id}', [StudentController::class, 'show']);
    });

    // Attendance Routes
    Route::prefix('attendance')->group(function () {
        Route::post('/', [AttendanceController::class, 'recordAttendance']);
        Route::get('/student/{id}', [AttendanceController::class, 'getAttendanceByStudent']);
    });

    // Marks Routes
    Route::prefix('marks')->group(function () {
        Route::post('/', [MarkController::class, 'recordMarks']);
        Route::get('/student/{id}', [MarkController::class, 'getMarksByStudent']);
    });

    // Subject Routes
    Route::prefix('subjects')->group(function () {
        Route::get('/', [SubjectController::class, 'index']);
        Route::post('/', [SubjectController::class, 'store']);
    });

    // Exam Routes
    Route::prefix('exams')->group(function () {
        Route::get('/', [ExamController::class, 'index']);
        Route::post('/', [ExamController::class, 'store']);
    });
});

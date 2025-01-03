<?php

namespace App\Http\Controllers;

use App\Services\AttendanceService;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    protected $attendanceService;

    public function __construct(AttendanceService $attendanceService)
    {
        $this->attendanceService = $attendanceService;
    }

    public function recordAttendance(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'date' => 'required|date',
            'status' => 'required|in:present,absent',
            'reason' => 'nullable|string',
        ]);

        return response()->json($this->attendanceService->recordAttendance($validated));
    }

    public function getAttendanceByStudent($studentId)
    {
        return response()->json($this->attendanceService->getAttendanceByStudent($studentId));
    }
}


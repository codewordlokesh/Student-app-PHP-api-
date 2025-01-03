<?php
namespace App\Services;

use App\Models\Attendance;

class AttendanceService
{
    public function recordAttendance($data)
    {
        return Attendance::create($data);
    }

    public function getAttendanceByStudent($studentId)
    {
        return Attendance::where('student_id', $studentId)->get();
    }
}

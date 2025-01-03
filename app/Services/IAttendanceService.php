<?php
namespace App\Services;

interface AttendanceServiceInterface
{
    public function recordAttendance(array $data);
    public function getAttendanceByStudent(int $studentId);
}

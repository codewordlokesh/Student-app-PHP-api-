<?php
namespace App\Services;

use App\Models\Mark;

class MarkService
{
    public function recordMarks($data)
    {
        return Mark::create($data);
    }

    public function getMarksByStudent($studentId)
    {
        return Mark::where('student_id', $studentId)->with(['subject', 'exam'])->get();
    }
}

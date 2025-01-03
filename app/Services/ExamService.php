<?php
namespace App\Services;

use App\Models\Exam;

class ExamService
{
    public function createExam($data)
    {
        return Exam::create($data);
    }

    public function getAllExams()
    {
        return Exam::all();
    }
}

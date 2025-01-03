<?php
namespace App\Services;

interface ExamServiceInterface
{
    public function getAllExams();
    public function createExam(array $data);
}

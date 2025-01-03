<?php
namespace App\Services;

interface MarkServiceInterface
{
    public function recordMarks(array $data);
    public function getMarksByStudent(int $studentId);
}

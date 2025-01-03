<?php
namespace App\Services;

use App\Models\Subject;

class SubjectService
{
    public function createSubject($data)
    {
        return Subject::create($data);
    }

    public function getAllSubjects()
    {
        return Subject::all();
    }
}

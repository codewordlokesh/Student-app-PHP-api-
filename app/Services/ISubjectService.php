<?php
namespace App\Services;

interface SubjectServiceInterface
{
    public function getAllSubjects();
    public function createSubject(array $data);
}

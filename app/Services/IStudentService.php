<?php
namespace App\Services;

use App\Models\Student;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface IStudentService
{
    public function createStudent(array $data): array;
    public function updateStudent(Student $student, array $data): array;
    public function deleteStudent(Student $student): array;
    public function getStudents(int $perPage = 10): LengthAwarePaginator;
    public function getStudentById(int $studentId): ?Student;
}

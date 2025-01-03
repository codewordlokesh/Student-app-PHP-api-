<?php
namespace App\Services;

use App\Models\Student;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class StudentService implements IStudentService
{
    // Create a new student
    public function createStudent(array $data): array
    {
        try {
            $student = Student::create([
                'firstname' => $data['firstname'],
                'lastname' => $data['lastname'],
                'mobile_no' => $data['mobile_no'],
                'email' => $data['email'],
                'department' => $data['department'],
                'dob' => $data['dob']
            ]);

            // Insert addresses if provided
            if (isset($data['addresses'])) {
                foreach ($data['addresses'] as $address) {
                    $student->addresses()->create([
                        'address1' => $address['address1'],
                        'city' => $address['city'],
                        'state' => $address['state'],
                        'zipcode' => $address['zipcode'],
                    ]);
                }
            }

            return ['message' => 'Student created successfully'];
        } catch (\Exception $e) {
            return ['error' => 'Failed to create student: ' . $e->getMessage()];
        }
    }

    // Update a student's information
    public function updateStudent(Student $student, array $data): array
    {
        try {
            $student->update([
                'firstname' => $data['firstname'],
                'lastname' => $data['lastname'],
                'mobile_no' => $data['mobile_no'],
                'email' => $data['email'],
                'department' => $data['department'],
                'dob' => $data['dob']
            ]);

            // Update addresses if provided
            if (isset($data['addresses'])) {
                foreach ($data['addresses'] as $address) {
                    $student->addresses()->updateOrCreate(
                        ['id' => $address['id']],
                        [
                            'address1' => $address['address1'],
                            'city' => $address['city'],
                            'state' => $address['state'],
                            'zipcode' => $address['zipcode'],
                        ]
                    );
                }
            }

            return ['message' => 'Student updated successfully'];
        } catch (\Exception $e) {
            return ['error' => 'Failed to update student: ' . $e->getMessage()];
        }
    }

    // Delete a student and related addresses
    public function deleteStudent(Student $student): array
    {
        try {
            // Delete related addresses first
            $student->addresses()->delete();

            // Then delete the student
            $student->delete();

            return ['message' => 'Student deleted successfully'];
        } catch (\Exception $e) {
            return ['error' => 'Failed to delete student: ' . $e->getMessage()];
        }
    }

    // Fetch all students with pagination
    public function getStudents(int $perPage = 10): LengthAwarePaginator
    {
        return Student::with('addresses')->paginate($perPage);
    }

    // Fetch a single student by ID
    public function getStudentById(int $studentId): ?Student
    {
        return Student::with('addresses')->find($studentId);
    }
}

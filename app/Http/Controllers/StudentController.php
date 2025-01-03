<?php
namespace App\Http\Controllers;

use App\Services\IStudentService;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    protected $studentService;

    public function __construct(IStudentService $studentService)
    {
        $this->studentService = $studentService;
    }

    // Store a new student
    public function store(Request $request)
    {
        $data = $request->all();
        $result = $this->studentService->createStudent($data);

        return response()->json($result);
    }

    // Update an existing student
    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);
        $data = $request->all();
        $result = $this->studentService->updateStudent($student, $data);

        return response()->json($result);
    }

    // Delete a student
    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $result = $this->studentService->deleteStudent($student);

        return response()->json($result);
    }

    // Get all students with pagination
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $students = $this->studentService->getStudents($perPage);

        return response()->json($students);
    }

    // Get a student by ID
    public function show($id)
    {
        $student = $this->studentService->getStudentById($id);

        if ($student) {
            return response()->json($student);
        }

        return response()->json(['error' => 'Student not found'], 404);
    }
}

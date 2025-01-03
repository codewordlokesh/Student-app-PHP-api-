<?php

namespace App\Http\Controllers;

use App\Services\ExamService;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    protected $examService;

    public function __construct(ExamService $examService)
    {
        $this->examService = $examService;
    }

    public function index()
    {
        return response()->json($this->examService->getAllExams());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:exams,name',
        ]);

        return response()->json($this->examService->createExam($validated));
    }

    public function show($id)
    {
        $exam = $this->examService->getAllExams()->find($id);

        if (!$exam) {
            return response()->json(['message' => 'Exam not found'], 404);
        }

        return response()->json($exam);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:exams,name,' . $id,
        ]);

        $exam = $this->examService->getAllExams()->find($id);

        if (!$exam) {
            return response()->json(['message' => 'Exam not found'], 404);
        }

        $exam->update($validated);
        return response()->json($exam);
    }

    public function destroy($id)
    {
        $exam = $this->examService->getAllExams()->find($id);

        if (!$exam) {
            return response()->json(['message' => 'Exam not found'], 404);
        }

        $exam->delete();
        return response()->json(['message' => 'Exam deleted successfully']);
    }
}


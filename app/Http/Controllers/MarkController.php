<?php

namespace App\Http\Controllers;

use App\Services\MarkService;
use Illuminate\Http\Request;

class MarkController extends Controller
{
    protected $markService;

    public function __construct(MarkService $markService)
    {
        $this->markService = $markService;
    }

    public function recordMarks(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_id' => 'required|exists:subjects,id',
            'exam_id' => 'required|exists:exams,id',
            'marks' => 'required|integer|min:0',
        ]);

        return response()->json($this->markService->recordMarks($validated));
    }

    public function getMarksByStudent($studentId)
    {
        return response()->json($this->markService->getMarksByStudent($studentId));
    }
}


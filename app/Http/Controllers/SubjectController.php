<?php

namespace App\Http\Controllers;

use App\Services\SubjectService;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    protected $subjectService;

    public function __construct(SubjectService $subjectService)
    {
        $this->subjectService = $subjectService;
    }

    public function index()
    {
        return response()->json($this->subjectService->getAllSubjects());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:subjects,name',
        ]);

        return response()->json($this->subjectService->createSubject($validated));
    }

    public function show($id)
    {
        $subject = $this->subjectService->getAllSubjects()->find($id);

        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        return response()->json($subject);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:subjects,name,' . $id,
        ]);

        $subject = $this->subjectService->getAllSubjects()->find($id);

        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        $subject->update($validated);
        return response()->json($subject);
    }

    public function destroy($id)
    {
        $subject = $this->subjectService->getAllSubjects()->find($id);

        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        $subject->delete();
        return response()->json(['message' => 'Subject deleted successfully']);
    }
}


<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LeadsController extends Controller
{
    public function index()
    {
        return inertia('public/consultation/index');
    }

    public function adminIndex()
    {
        $leads = Lead::query();

        $leads = $leads->paginate(10);

        return inertia('admin/leads/index', [
            'leads' => $leads,
            'filters' => request()->all('search', 'trashed'),
        ]);
    }

    public function store(Request $request)
    {
        $request->merge([
            'certify_truth' => (bool) $request->certify_truth,
            'in_uk_now' => (bool) $request['in_uk_now'],
            'is_whatsapp' => (bool) $request['is_whatsapp'],
        ]);

        $data = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'mobile_country_code' => 'required|string',
            'mobile' => 'required|string',
            'is_whatsapp' => 'required|boolean',
            'country_of_residence' => 'required|string',
            'in_uk_now' => 'required|boolean',
            'study_type' => 'required|string',
            'subject_interested' => 'required|string',
            'certify_truth' => 'required|boolean',
        ]);

        if ($data['certify_truth']) {
            DB::transaction(function () use ($data) {
                Lead::create($data);
            });
        } else {
            return redirect()->back()->withErrors([
                'certify_truth' => 'You must certify that the information you provided is correct.',
            ]);
        }

        return redirect()->back()->with('success', 'Your message has been sent successfully.');
    }
}

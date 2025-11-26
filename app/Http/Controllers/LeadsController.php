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

    public function adminIndex(Request $request)
    {
        $leads = Lead::query()
            ->when($request->search, function ($q) use ($request) {
                $q->where(function ($query) use ($request) {
                    $query->where('first_name', 'like', "%{$request->search}%")
                        ->orWhere('last_name', 'like', "%{$request->search}%")
                        ->orWhereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$request->search}%"])
                        ->orWhere('email', 'like', "%{$request->search}%")
                        ->orWhere('mobile', 'like', "%{$request->search}%")
                        ->orWhereRaw("CONCAT(mobile_country_code, ' ', mobile) LIKE ?", ["%{$request->search}%"]);
                });
            })
            ->when($request->study_type, function ($q) use ($request) {
                $q->where('study_type', $request->study_type);
            })
            ->when($request->country_of_residence, function ($q) use ($request) {
                $q->where('country_of_residence', $request->country_of_residence);
            })
            ->when($request->subject_interested, function ($q) use ($request) {
                $q->where('subject_interested', $request->subject_interested);
            })
            ->when(!is_null($request->in_uk_now), function ($q) use ($request) {
                $q->where('in_uk_now', $request->in_uk_now);
            })
            ->when(!is_null($request->is_whatsapp), function ($q) use ($request) {
                $q->where('is_whatsapp', $request->is_whatsapp);
            });

        $leads = $leads->orderBy('created_at', 'desc')->paginate($request->per_page ?? 20);

        return inertia('admin/leads/index', [
            'leads' => $leads,
            'filters' => array_merge([
                'search' => '',
                'study_type' => '',
                'country_of_residence' => '',
                'subject_interested' => '',
                'in_uk_now' => '',
                'is_whatsapp' => '',
                'per_page' => 20,
            ], $request->only([
                'search',
                'study_type',
                'country_of_residence',
                'subject_interested',
                'in_uk_now',
                'is_whatsapp',
                'per_page',
            ])),
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

    public function adminShow(Lead $lead)
    {
        return inertia('admin/leads/show', [
            'lead' => $lead,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UmrohPackage;
use Inertia\Inertia;

class UmrohPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $packages = UmrohPackage::latest('departure_date')
            ->available()
            ->paginate(12);
        
        return Inertia::render('packages/index', [
            'packages' => $packages
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(UmrohPackage $package)
    {
        return Inertia::render('packages/show', [
            'package' => $package
        ]);
    }
}
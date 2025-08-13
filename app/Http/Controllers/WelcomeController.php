<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UmrohPackage;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    /**
     * Display the welcome page with featured packages.
     */
    public function index()
    {
        $featuredPackages = UmrohPackage::featured()
            ->available()
            ->latest('departure_date')
            ->take(6)
            ->get();
            
        $allPackagesCount = UmrohPackage::available()->count();
        
        return Inertia::render('welcome', [
            'featuredPackages' => $featuredPackages,
            'allPackagesCount' => $allPackagesCount
        ]);
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DonorController extends Controller
{

    public function index()
    {
        $donors = Donor::orderBy('name')->get();

        return $donors;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'regex:/^[a-zA-Z\s]+$/', 'min:3', 'max:60'],
            'dni' => 'required|unique:donors|max:8|min:7',
            'number' => 'required|max:25|min:6',
            'last' => 'nullable',
            'blood' => 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
        ], [
            'name.required' => 'El campo nombre no puede estar vacío.',
            'name.regex' => 'El campo nombre solo puede contener letras y espacios.',
            'name.max' => 'Máximo 60 caracteres.',
            'name.min' => 'Mínimo 3 caracteres.',
            'dni.required' => 'El campo DNI no puede estar vacío.',
            'dni.unique' => 'El DNI ingresado ya existe en la base de datos.',
            'dni.max' => 'Máximo 8 caracteres.',
            'dni.min' => 'Mínimo 7 caracteres.',
            'number.required' => 'El campo número no puede estar vacío.',
            'number.max' => 'Máximo 25 caracteres.',
            'number.min' => 'Mínimo 6 caracteres.',
            'blood.required' => 'El campo tipo de sangre es obligatorio.',
            'blood.in' => 'El tipo de sangre no es válido.',
        ]);


        $donor = new Donor();
        $donor->name = $request->name;
        $donor->dni = $request->dni;
        $donor->number = $request->number;
        $donor->blood = $request->blood;
        $donor->last = $request->last;
        $donor->save();
        return $donor;
    }


    public function show(string $id)
    {
        $donor = Donor::find($id);
        return $donor;
    }


    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'regex:/^[a-zA-Z\s]+$/', 'min:3', 'max:60'],
            'dni' => 'required|max:8|min:7',
            'number' => 'required|max:25|min:6',
            'last' => 'nullable',
            'blood' => 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
        ], [
            'name.required' => 'El campo nombre no puede estar vacío.',
            'name.regex' => 'El campo nombre solo puede contener letras y espacios.',
            'name.max' => 'Máximo 60 caracteres.',
            'name.min' => 'Mínimo 3 caracteres.',
            'dni.required' => 'El campo DNI no puede estar vacío.',
            'dni.unique' => 'El DNI ingresado ya existe en la base de datos.',
            'dni.max' => 'Máximo 8 caracteres.',
            'dni.min' => 'Mínimo 7 caracteres.',
            'number.required' => 'El campo número no puede estar vacío.',
            'number.max' => 'Máximo 25 caracteres.',
            'number.min' => 'Mínimo 6 caracteres.',
            'blood.required' => 'El campo tipo de sangre es obligatorio.',
            'blood.in' => 'El tipo de sangre no es válido.',
        ]);

        $donor = Donor::findOrFail($request->id);
        $donor->name = $request->name;
        $donor->dni = $request->dni;
        $donor->number = $request->number;
        $donor->blood = $request->blood;
        $donor->last = $request->last;

        $donor->save();
        return $donor;
    }


    public function destroy(string $id)
    {
        $donor = Donor::destroy($id);
        return $donor;
    }
}

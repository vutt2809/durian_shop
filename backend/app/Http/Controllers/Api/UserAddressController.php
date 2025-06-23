<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserAddressController extends Controller
{
    public function index(Request $request)
    {
        $addresses = $request->user()->userAddresses()->get();

        return response()->json([
            'success' => true,
            'addresses' => $addresses ?? []
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address1' => 'required|string|max:255',
            'address2' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'ward' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'phone' => 'required|string|max:20',
            'is_default' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $data = $request->all();
        $data['user_id'] = $request->user()->id;

        if ($request->is_default) {
            $request->user()->userAddresses()->update(['is_default' => false]);
        }

        $address = UserAddress::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Address added successfully.',
            'address' => $address
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $address = $request->user()->userAddresses()->find($id);

        if (!$address) {
            return response()->json(['error' => 'Address not found.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'address1' => 'sometimes|required|string|max:255',
            'address2' => 'nullable|string|max:255',
            'city' => 'sometimes|required|string|max:255',
            'district' => 'sometimes|required|string|max:255',
            'ward' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'phone' => 'sometimes|required|string|max:20',
            'is_default' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        if ($request->is_default) {
            $request->user()->userAddresses()->where('id', '!=', $id)->update(['is_default' => false]);
        }

        $address->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Address updated successfully.',
            'address' => $address
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $address = $request->user()->userAddresses()->find($id);

        if (!$address) {
            return response()->json(['error' => 'Address not found.'], 404);
        }

        $address->delete();

        return response()->json(['success' => true, 'message' => 'Address deleted successfully.']);
    }

    public function setDefault(Request $request, $id)
    {
        $address = $request->user()->userAddresses()->find($id);

        if (!$address) {
            return response()->json(['error' => 'Address not found.'], 404);
        }

        $request->user()->userAddresses()->update(['is_default' => false]);
        $address->update(['is_default' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Default address updated successfully.',
            'address' => $address
        ]);
    }
} 
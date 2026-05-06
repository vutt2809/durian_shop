<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'full_name',
        'phone',
        'address1',
        'address2',
        'city',
        'district',
        'ward',
        'postal_code',
        'is_default',
        'notes',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'shipping_address_id');
    }

    public function getFullAddressAttribute()
    {
        $address = $this->address1;
        if ($this->address2) {
            $address .= ', ' . $this->address2;
        }
        $address .= ', ' . ($this->ward ?: '') . ', ' . $this->district . ', ' . $this->city;
        if ($this->postal_code) {
            $address .= ', ' . $this->postal_code;
        }
        return trim(preg_replace('/\s+/', ' ', str_replace(', ,', ',', $address)));
    }
}


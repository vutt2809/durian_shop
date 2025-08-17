<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'sku',
        'name',
        'slug',
        'image_url',
        'image_key',
        'description',
        'quantity',
        'price',
        'weight',
        'ripeness',
        'origin',
        'is_active',
        'category_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'weight' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function shoppingCart()
    {
        return $this->hasMany(ShoppingCart::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }



    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByRipeness($query, $ripeness)
    {
        return $query->where('ripeness', $ripeness);
    }

    public function scopeByOrigin($query, $origin)
    {
        return $query->where('origin', $origin);
    }

    public function scopeInStock($query)
    {
        return $query->where('quantity', '>', 0);
    }

    public function getFormattedWeightAttribute()
    {
        return $this->weight ? $this->weight . ' kg' : 'N/A';
    }

    public function getFormattedPriceAttribute()
    {
        return number_format($this->price, 0, ',', '.') . ' VNĐ';
    }
} 
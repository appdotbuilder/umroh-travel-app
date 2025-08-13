<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UmrohPackage
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $price
 * @property int $duration_days
 * @property \Illuminate\Support\Carbon $departure_date
 * @property string $hotel_mecca
 * @property string $hotel_medina
 * @property string $inclusions
 * @property string|null $exclusions
 * @property int $available_slots
 * @property bool $is_featured
 * @property string|null $image_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage query()
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereAvailableSlots($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereDepartureDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereDurationDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereExclusions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereHotelMecca($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereHotelMedina($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereInclusions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage featured()
 * @method static \Illuminate\Database\Eloquent\Builder|UmrohPackage available()
 * @method static \Database\Factories\UmrohPackageFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class UmrohPackage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'duration_days',
        'departure_date',
        'hotel_mecca',
        'hotel_medina',
        'inclusions',
        'exclusions',
        'available_slots',
        'is_featured',
        'image_url',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'departure_date' => 'date',
        'price' => 'decimal:2',
        'is_featured' => 'boolean',
        'duration_days' => 'integer',
        'available_slots' => 'integer',
    ];

    /**
     * Scope a query to only include featured packages.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to only include available packages.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('available_slots', '>', 0);
    }

    /**
     * Get formatted price with currency.
     *
     * @return string
     */
    public function getFormattedPriceAttribute()
    {
        return 'Rp ' . number_format((float) $this->price, 0, ',', '.');
    }
}
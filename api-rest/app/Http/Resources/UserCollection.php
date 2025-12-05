<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $totalUsers = User::count();

        return [
            'data' => $this->collection,
            'infos' => [
                'total_users' => $totalUsers,
            ],
        ];
    }
}

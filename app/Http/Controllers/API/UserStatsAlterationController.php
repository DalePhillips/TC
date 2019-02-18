<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\User;
use App\Models\UserStats;

class UserStatsAlterationController extends Controller
{
    public function addMoney(Request $request, $id)
    {
        $stats = UserStats::where('user_id', $id)->first();
        $stats->money = $stats->money + $request->input('moneyToAdd');
        $stats->update();
        return $request->all();

        return ['message' => 'Money altered'];
    }
}
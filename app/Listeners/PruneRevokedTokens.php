<?php

namespace App\Listeners;

use Laravel\Passport\Events\AccessTokenCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\DB;

class PruneRevokedTokens
{
    /**
     * Handle the event.
     *
     * @param  AccessTokenCreated  $event
     * @return void
     */
    public function handle(AccessTokenCreated $event)
    {
      // TODO: Fix the behaviour that it keeps previous token
      DB::table('oauth_access_tokens')
        ->where('user_id', $event->userId)
        ->where('client_id', $event->clientId)
        ->where('revoked', true)
        ->delete();
    }
}

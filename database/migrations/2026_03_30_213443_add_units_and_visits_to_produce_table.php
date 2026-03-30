<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('produce', function (Blueprint $table) {
            $table->string('stock_unit')->nullable();
            $table->string('price_unit')->nullable();
            $table->boolean('allow_farm_visits')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produce', function (Blueprint $table) {
            $table->dropColumn(['stock_unit', 'price_unit', 'allow_farm_visits']);
        });
    }
};

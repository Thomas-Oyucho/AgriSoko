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
            $table->string('weight_size')->nullable()->after('quantity_available');
            $table->string('unit')->nullable()->after('weight_size');
            $table->boolean('allow_farm_visits')->default(false)->after('unit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produce', function (Blueprint $table) {
            $table->dropColumn(['weight_size', 'unit', 'allow_farm_visits']);
        });
    }
};

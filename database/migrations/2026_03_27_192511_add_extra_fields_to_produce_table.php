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
            $table->string('weight_size')->nullable();
            $table->string('unit')->nullable();
            $table->boolean('allow_farm_visits')->default(false);
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

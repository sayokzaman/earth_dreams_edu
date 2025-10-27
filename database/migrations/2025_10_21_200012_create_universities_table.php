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
        Schema::create('universities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->string('name')->unique();
            $table->string('cover');
            $table->string('logo');
            $table->string('location');
            $table->text('location_url');
            $table->string('founded');
            $table->integer('guardian_ranking')->nullable();
            $table->integer('world_ranking')->nullable();
            $table->integer('qs_ranking')->nullable();
            $table->string('scholarship')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('universities');
    }
};

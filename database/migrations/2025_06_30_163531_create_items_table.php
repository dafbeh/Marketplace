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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->decimal('price', 8, 2)->default(0.00);
            $table->integer('quantity')->default(0);
            $table->string('category')->nullable();
            $table->string('image_url')->nullable();
            $table->string('sku')->unique()->nullable();
            $table->softDeletes();

            // Indexes for performance
            $table->index(['name', 'category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};

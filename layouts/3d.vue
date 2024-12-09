<template>
    <div class="min-h-screen flex flex-col justify-between text-gray-800 dark:text-gray-100 relative">
        <header
            class="sticky top-0 z-40 bg-gray-50/75 dark:bg-gray-950/75 backdrop-blur-xl border-b border-gray-500/50 dark:border-gray-900 h-[68px] flex">
            <PageContainer class="flex-1 flex items-center justify-between">
                <NuxtLink to="/" class="font-bold text-lg">Olympic IMDB</NuxtLink>
                <div class="flex justify-between gap-2">
                    <PrimaryButton label="3D" type="link" link="/3d" onClick="" />
                    <p class="">|</p>
                    <ToggleMode />
                </div>
            </PageContainer>
        </header>
        <div class="px-8">
            <slot />
        </div>
        <footer
            class="bg-gray-50/75 dark:bg-gray-950/75 backdrop-blur-xl border-t border-gray-500/50 dark:border-gray-900 h-[38px] flex">
            <PageContainer class="flex-1 flex items-center">
                <div class="flex-1">
                    <span class="text-sm">&copy; 2024 Afu</span>
                </div>
            </PageContainer>
        </footer>
    </div>
</template>
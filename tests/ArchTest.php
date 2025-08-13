<?php

use Symfony\Component\Finder\Finder;

arch()->preset()->php()->ignoring(['dd', 'dump']);

arch()->preset()->laravel();
arch()->preset()->relaxed();
arch()->preset()->security()->ignoring(['array_rand', 'parse_str', 'mt_rand', 'uniqid', 'sha1']);

arch('annotations')
    ->expect('App')
    ->toUseStrictEquality()
    ->toHavePropertiesDocumented()
    ->toHaveMethodsDocumented();

arch('test files should extend TestCase')
    ->expect(function () {
        $finder = Finder::create()
            ->in(['tests/Feature', 'tests/Unit'])
            ->files()
            ->name('*.php');

        $invalidFiles = [];
        foreach ($finder as $file) {
            $content = file_get_contents($file->getRealPath());
            if (preg_match('/class\s+\w+Test/', $content) && !preg_match('/extends\s+(Tests\\\\)?TestCase/', $content)) {
                $invalidFiles[] = $file->getRealPath();
            }
        }

        return $invalidFiles;
    })
    ->toBeEmpty();

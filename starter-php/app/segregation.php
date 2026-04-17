<?php

namespace App {

    interface Animal
    {
        public function fly(): void;
        public function swim(): void;
        public function run(): void;
    }

    class Dog implements Animal
    {
        public function fly(): void
        {
            // n'a aucun sens
        }

        public function swim(): void
        {
            echo "Le chien nage";
        }

        public function run(): void
        {
            echo "Le chien court";
        }
    }

    class Fish implements Animal
    {
        public function fly(): void
        {
            // n'a aucun sens
        }

        public function swim(): void
        {
            echo "Le poisson nage";
        }

        public function run(): void
        {
            // n'a aucun sens
        }
    }
}

namespace Correction {
    interface Flyable
    {
        public function fly(): void;
    }

    interface Swimmable
    {
        public function swim(): void;
    }

    interface Runnable
    {
        public function run(): void;
    }

    class Dog implements Runnable, Swimmable
    {
        public function run(): void
        {
            echo "Le chien court";
        }

        public function swim(): void
        {
            echo "Le chien nage";
        }
    }

    class Fish implements Swimmable
    {
        public function swim(): void
        {
            echo "Le poisson nage";
        }
    }

    class Bird implements Flyable
    {
        public function fly(): void
        {
            echo "L'oiseau vole";
        }
    }
}

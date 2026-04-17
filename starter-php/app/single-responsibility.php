<?php

namespace App {
    class UserManager
    {
        public function createUser(array $data): void
        {
            // Validation
            if (empty($data['email'])) {
                throw new \InvalidArgumentException("Email obligatoire");
            }

            // Persistance (simulation DB)
            echo "Insertion utilisateur en base\n";

            // Envoi d'email
            echo "Envoi email de bienvenue à {$data['email']}\n";

            // Logging
            echo "Log: utilisateur créé\n";
        }
    }

    $manager = new UserManager();
    $manager->createUser(['email' => 'alice@example.com']);
}

namespace Correction {
    class UserValidator
    {
        public function validate(array $data): void
        {
            if (empty($data['email'])) {
                throw new \InvalidArgumentException("Email obligatoire");
            }
        }
    }

    class UserRepository
    {
        public function save(array $data): void
        {
            echo "Insertion utilisateur en base\n";
        }
    }

    class WelcomeEmailSender
    {
        public function send(string $email): void
        {
            echo "Envoi email de bienvenue à {$email}\n";
        }
    }

    class Logger
    {
        public function info(string $message): void
        {
            echo "Log: {$message}\n";
        }
    }

    class UserService
    {
        public function __construct(
            private UserValidator $validator,
            private UserRepository $repository,
            private WelcomeEmailSender $emailSender,
            private Logger $logger
        ) {
        }

        public function createUser(array $data): void
        {
            $this->validator->validate($data);
            $this->repository->save($data);
            $this->emailSender->send($data['email']);
            $this->logger->info("utilisateur créé");
        }
    }

    $service = new UserService(
        new UserValidator(),
        new UserRepository(),
        new WelcomeEmailSender(),
        new Logger()
    );
    $service->createUser(['email' => 'alice@example.com']);
}

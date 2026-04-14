<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'casting', uniqueConstraints: [new ORM\UniqueConstraint(name: 'uq_casting', columns: ['movie_id', 'person_id', 'role_name'])])]
#[UniqueEntity(fields: ['movie', 'person', 'roleName'])]
#[ApiResource]
class Casting
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'bigint')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Movie::class, inversedBy: 'castings')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private ?Movie $movie = null;

    #[ORM\ManyToOne(targetEntity: Person::class, inversedBy: 'castings')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private ?Person $person = null;

    #[ApiProperty(example: 'Cobb')]
    #[Assert\NotBlank]
    #[Assert\Length(max: 80)]
    #[ORM\Column(length: 80)]
    private string $roleName;

    #[ApiProperty(example: 1)]
    #[Assert\Positive]
    #[ORM\Column(type: 'smallint')]
    private int $billingOrder;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMovie(): ?Movie
    {
        return $this->movie;
    }

    public function setMovie(?Movie $movie): self
    {
        $this->movie = $movie;

        return $this;
    }

    public function getPerson(): ?Person
    {
        return $this->person;
    }

    public function setPerson(?Person $person): self
    {
        $this->person = $person;

        return $this;
    }

    public function getRoleName(): string
    {
        return $this->roleName;
    }

    public function setRoleName(string $roleName): self
    {
        $this->roleName = $roleName;

        return $this;
    }

    public function getBillingOrder(): int
    {
        return $this->billingOrder;
    }

    public function setBillingOrder(int $billingOrder): self
    {
        $this->billingOrder = $billingOrder;

        return $this;
    }
}

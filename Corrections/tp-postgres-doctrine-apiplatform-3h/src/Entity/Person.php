<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'person')]
#[UniqueEntity(fields: ['fullName', 'birthDate'])]
#[ApiResource]
class Person
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    private Uuid $id;

    #[ApiProperty(example: 'Christopher Nolan')]
    #[Assert\NotBlank]
    #[Assert\Length(max: 150)]
    #[ORM\Column(length: 150)]
    private string $fullName;

    #[ApiProperty(example: '1970-07-30')]
    #[ORM\Column(type: 'date', nullable: true)]
    private ?DateTimeInterface $birthDate = null;

    /** @var Collection<int, Casting> */
    #[ORM\OneToMany(mappedBy: 'person', targetEntity: Casting::class, cascade: ['persist', 'remove'])]
    private Collection $castings;

    public function __construct()
    {
        $this->id = Uuid::v4();
        $this->castings = new ArrayCollection();
    }

    public function getId(): Uuid
    {
        return $this->id;
    }

    public function getFullName(): string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): self
    {
        $this->fullName = $fullName;

        return $this;
    }

    public function getBirthDate(): ?DateTimeInterface
    {
        return $this->birthDate;
    }

    public function setBirthDate(?DateTimeInterface $birthDate): self
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    /** @return Collection<int, Casting> */
    public function getCastings(): Collection
    {
        return $this->castings;
    }
}

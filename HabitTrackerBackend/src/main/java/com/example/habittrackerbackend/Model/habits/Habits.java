package com.example.habittrackerbackend.Model.habits;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Habits {
  @Id
  private Long id;

  private String name;
  private String smallBite;
  private String specialBite;
  private String emergencyBite;
}

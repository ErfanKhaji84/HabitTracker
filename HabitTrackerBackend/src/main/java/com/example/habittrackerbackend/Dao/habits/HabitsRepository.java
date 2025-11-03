package com.example.habittrackerbackend.Dao.habits;

import com.example.habittrackerbackend.Model.habits.Habits;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitsRepository extends JpaRepository<Habits, Long> {
}

// app.js
const { createApp, ref, computed } = Vue;

const app = createApp({
    setup() {
        // MARK: - Estado Reativo
        const isWorkoutRunning = ref(false);
        const elapsedTime = ref(0);
        const timer = ref(null);
        
        const isRestTimerActive = ref(false);
        const restTimeRemaining = ref(0);
        const restTimer = ref(null);
        
        const defaultRestDuration = 60; // segundos
        const totalExercises = 10;
        const totalSets = 5;

        // Mock de dados para o treino, agora gerando 10 exercícios
        const currentWorkout = ref({
            name: "Treino Padrão",
            exercises: Array.from({ length: totalExercises }, (_, i) => ({
                id: i + 1,
                name: `Exercício ${i + 1}`, // Nome genérico
                sets: totalSets, // Séries fixas em 5
                reps: "8-12",
                seriesCompleted: 0,
            })),
        });

        // MARK: - Funções de Lógica
        
        // Cronômetro Geral
        const startWorkout = () => {
            if (isWorkoutRunning.value) return;
            isWorkoutRunning.value = true;
            timer.value = setInterval(() => {
                elapsedTime.value++;
            }, 1000);
        };

        const stopWorkout = () => {
            clearInterval(timer.value);
            isWorkoutRunning.value = false;
        };

        const toggleWorkout = () => {
            if (isWorkoutRunning.value) {
                stopWorkout();
                alert("Treino finalizado!");
            } else {
                startWorkout();
            }
        };

        // Controle de Séries e Pausa
        const completeSet = (exercise) => {
            if (exercise.seriesCompleted < exercise.sets) {
                exercise.seriesCompleted++;
                if (exercise.seriesCompleted < exercise.sets) {
                    startRestTimer();
                } else {
                    alert(`Exercício ${exercise.id} concluído!`);
                }
            }
        };
        
        const startRestTimer = () => {
            if (isRestTimerActive.value) return;
            isRestTimerActive.value = true;
            restTimeRemaining.value = defaultRestDuration;
            
            clearInterval(restTimer.value);
            restTimer.value = setInterval(() => {
                if (restTimeRemaining.value > 0) {
                    restTimeRemaining.value--;
                } else {
                    stopRestTimer();
                }
            }, 1000);
        };

        const stopRestTimer = () => {
            clearInterval(restTimer.value);
            isRestTimerActive.value = false;
        };
        
        // Formatação do Tempo
        const formatTime = (timeInSeconds) => {
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };

        // Retorna o estado e as funções para a View (HTML)
        return {
            isWorkoutRunning,
            elapsedTime,
            isRestTimerActive,
            restTimeRemaining,
            currentWorkout,
            toggleWorkout,
            completeSet,
            stopRestTimer,
            formatTime
        };
    }
});

app.mount('#app');
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Content from './Content';

// Test 1: Rendering der Komponente
test('renders Content component without crashing', () => {
  render(<Content />);
  expect(screen.getByText('To Do')).toBeInTheDocument();
  expect(screen.getByText('In Progress')).toBeInTheDocument();
  expect(screen.getByText('Done')).toBeInTheDocument();
});

// Test 2: Task hinzufügen Popup öffnet sich
test('opens Add Task popup when "Add Task" button is clicked', () => {
  render(<Content />);
  fireEvent.click(screen.getAllByText('Add Task')[0]); // Klicken des ersten "Add Task"-Buttons unter "To Do"
  
  expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
});

// Test 3: Neues Task hinzufügen und Fehlernachricht bei leerem Titel/Beschreibung
test('displays error message when trying to add a task without title and description', async () => {
  render(<Content />);
  fireEvent.click(screen.getAllByText('Add Task')[0]);

  // Klicken auf den "Add Task"-Button ohne Daten
  fireEvent.click(screen.getByText('Add Task'));

  expect(screen.getByText('Titel und Beschreibung sind erforderlich.')).toBeInTheDocument();
});

// Test 4: Task löschen
test('deletes a task when "Delete" button is clicked', async () => {
  render(<Content />);
  
  // Simuliere, dass ein Task vorhanden ist
  const mockTask = {
    id: '1',
    content: { title: 'Sample Task', text: 'Sample Description', status: 'To Do' },
  };
  
  // Füge einen Task zur Seite hinzu
  fireEvent.click(screen.getAllByText('Add Task')[0]);
  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: mockTask.content.title } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: mockTask.content.text } });
  fireEvent.click(screen.getByText('Add Task'));

  // Task löschen
  await waitFor(() => fireEvent.click(screen.getByText('Delete')));
  
  // Prüfen, dass der Task entfernt wurde
  expect(screen.queryByText('Sample Task')).not.toBeInTheDocument();
});

// Test 5: Zuweisen von Benutzern
test('opens assign users popup when "Assign Users" button is clicked', async () => {
  render(<Content />);

  // Simuliere, dass ein Task vorhanden ist
  const mockTask = {
    id: '1',
    content: { title: 'Task 1', text: 'Description for Task 1', status: 'To Do' },
  };
  
  // Füge einen Task zur Seite hinzu
  fireEvent.click(screen.getAllByText('Add Task')[0]);
  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: mockTask.content.title } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: mockTask.content.text } });
  fireEvent.click(screen.getByText('Add Task'));

  // "Assign Users"-Button klicken
  await waitFor(() => fireEvent.click(screen.getByText('Assign Users')));

  // Prüfen, dass das Popup für das Zuweisen von Benutzern erscheint
  expect(screen.getByText('Assign Users to Task')).toBeInTheDocument();
});
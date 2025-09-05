import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Platform,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import Input from '../components/Input';
import DropDownInput from '../components/DropDownInput';
import { hp, radius, wp } from '../../Theme';
import { BaseLayout } from '../components/BaseLayout';

const HomeTemplate = ({
  modalVisible,
  setModalVisible,
  taskData,
  setTaskData,
  showDatePicker,
  setShowDatePicker,
  handleSaveTask,
  tasks,
  setEditingTaskIndex,
  toggleTaskCompleted
}) => {
  const openEditModal = (task, index) => {
    setTaskData(task);
    setEditingTaskIndex(index);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Button
        buttonStyle={{ width: '50%', alignSelf: 'flex-end', marginBottom: hp(2) }}
        title="Add Task"
        onPress={() => {
          setTaskData({
            title: '',
            description: '',
            dueDate: new Date(),
            priority: 'Low',
            completed: false,
            comment: ''
          });
          setEditingTaskIndex(null);
          setModalVisible(true);
        }}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.taskCard, item.completed && { backgroundColor: '#f0f0f0' }]}>
            <View style={styles.taskContent}>
              <View style={styles.taskText}>
                <Text style={[styles.taskTitle, item.completed && { textDecorationLine: 'line-through', color: 'gray' }]}>{item.title}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <Text style={styles.taskMeta}>Due: {new Date(item.dueDate).toDateString()}</Text>
                <Text style={styles.taskMeta}>Priority: {item.priority}</Text>
                <Text style={styles.taskMeta}>Comment: {item.comment || 'No comment'}</Text>
              </View>

              <View style={styles.taskActions}>
               {!item.completed&&<Pressable onPress={() => openEditModal(item, index)} style={styles.editButton}>
                  <Feather name="edit-2" size={22} color="#4a90e2" />
                </Pressable>}
                <Pressable onPress={() => toggleTaskCompleted(index)} style={styles.completeButton}>
                  <Feather name={item.completed ? "check-circle" : "circle"} size={22} color={item.completed ? "green" : "gray"} />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add / Edit Task</Text>
            <BaseLayout scrollable={true}>
            <Input
              label="Title"
              placeholder="Enter task title"
              value={taskData.title}
              onChangeText={(val) => setTaskData({ ...taskData, title: val })}
              containerStyle={{ marginBottom: hp(2) }}
            />

            <Input
              label="Description"
              placeholder="Enter task description"
              value={taskData.description}
              onChangeText={(val) => setTaskData({ ...taskData, description: val })}
              containerStyle={{ marginBottom: hp(2) }}
              multiline
            />

            <Input
              label="Comment"
              placeholder="Enter comment"
              value={taskData.comment}
              onChangeText={(val) => setTaskData({ ...taskData, comment: val })}
              containerStyle={{ marginBottom: hp(2) }}
              multiline
            />

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{taskData.dueDate.toDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={taskData.dueDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => {
                  if (date) setTaskData({ ...taskData, dueDate: date });
                  setShowDatePicker(Platform.OS === 'ios');
                }}
              />
            )}

            <DropDownInput
              label="Priority"
              value={taskData.priority}
              data={[
                { label: 'Low', value: 'Low' },
                { label: 'Medium', value: 'Medium' },
                { label: 'High', value: 'High' }
              ]}
              onValueChange={(val) => setTaskData({ ...taskData, priority: val })}
              containerStyle={{ marginBottom: hp(2) }}
            />

            <Button title="Save Task" buttonStyle={{ marginBottom: hp(2) }} onPress={handleSaveTask} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                </BaseLayout>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: hp(5), paddingHorizontal: wp(5) },
  taskCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: radius.xl,
    marginBottom: hp(1.5),
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  taskText: { flex: 1, paddingRight: 10 },
  taskTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4, color: '#333' },
  taskDescription: { fontSize: 14, color: '#555', marginBottom: 6 },
  taskMeta: { fontSize: 12, color: '#888' },
  taskActions: { flexDirection: 'row', alignItems: 'center' },
  editButton: { marginRight: 10 },
  completeButton: {},
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '80%' },
  modalTitle: { fontSize: 20, fontWeight: '600', marginBottom: 15 },
  dateButton: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
});

export { HomeTemplate };

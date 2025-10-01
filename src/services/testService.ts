import { StorageService } from './storage';

export interface Test {
  id: string;
  name: string;
  steps: number;
  lastRun: string;
  status: "passed" | "failed" | "pending";
  environment: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestStep {
  id: number;
  action: string;
  selector: string;
  status: "pending" | "passed" | "failed" | "warning";
}

export interface TestRun {
  id: string;
  testId: string;
  status: "passed" | "failed" | "running";
  duration: number;
  timestamp: string;
  steps: TestStep[];
}

const STORAGE_KEYS = {
  TESTS: 'tests',
  TEST_RUNS: 'test-runs',
} as const;

// Default test data
const defaultTests: Test[] = [
  {
    id: "1",
    name: "Login Flow - Happy Path",
    steps: 8,
    lastRun: "2 hours ago",
    status: "passed",
    environment: "staging",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    name: "Checkout Process",
    steps: 15,
    lastRun: "1 day ago",
    status: "failed",
    environment: "production",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    name: "User Registration",
    steps: 12,
    lastRun: "3 days ago",
    status: "passed",
    environment: "dev",
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    name: "Search Functionality",
    steps: 6,
    lastRun: "Never",
    status: "pending",
    environment: "staging",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export class TestService {
  static async getTests(): Promise<Test[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return StorageService.getItem(STORAGE_KEYS.TESTS, defaultTests);
  }

  static async createTest(testData: Omit<Test, 'id' | 'createdAt' | 'updatedAt'>): Promise<Test> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const tests = await this.getTests();
    const newTest: Test = {
      ...testData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedTests = [newTest, ...tests];
    StorageService.setItem(STORAGE_KEYS.TESTS, updatedTests);
    
    return newTest;
  }

  static async updateTest(id: string, updates: Partial<Test>): Promise<Test> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const tests = await this.getTests();
    const testIndex = tests.findIndex(test => test.id === id);
    
    if (testIndex === -1) {
      throw new Error('Test not found');
    }
    
    const updatedTest = {
      ...tests[testIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    tests[testIndex] = updatedTest;
    StorageService.setItem(STORAGE_KEYS.TESTS, tests);
    
    return updatedTest;
  }

  static async deleteTest(id: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const tests = await this.getTests();
    const filteredTests = tests.filter(test => test.id !== id);
    StorageService.setItem(STORAGE_KEYS.TESTS, filteredTests);
  }

  static async getTestRuns(testId?: string): Promise<TestRun[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const defaultRuns: TestRun[] = [
      {
        id: "run-1",
        testId: "1",
        status: "passed",
        duration: 2300,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        steps: [],
      },
      {
        id: "run-2",
        testId: "2",
        status: "failed",
        duration: 5100,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        steps: [],
      },
      {
        id: "run-3",
        testId: "3",
        status: "passed",
        duration: 3700,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        steps: [],
      },
      {
        id: "run-4",
        testId: "4",
        status: "passed",
        duration: 1900,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        steps: [],
      },
    ];
    
    const runs = StorageService.getItem(STORAGE_KEYS.TEST_RUNS, defaultRuns);
    
    if (testId) {
      return runs.filter(run => run.testId === testId);
    }
    
    return runs;
  }

  static async createTestRun(runData: Omit<TestRun, 'id' | 'timestamp'>): Promise<TestRun> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const runs = await this.getTestRuns();
    const newRun: TestRun = {
      ...runData,
      id: `run-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    const updatedRuns = [newRun, ...runs];
    StorageService.setItem(STORAGE_KEYS.TEST_RUNS, updatedRuns);
    
    return newRun;
  }

  static async getTestStats(): Promise<{
    total: number;
    passed: number;
    failed: number;
    pending: number;
  }> {
    const tests = await this.getTests();
    
    return {
      total: tests.length,
      passed: tests.filter(test => test.status === 'passed').length,
      failed: tests.filter(test => test.status === 'failed').length,
      pending: tests.filter(test => test.status === 'pending').length,
    };
  }
}

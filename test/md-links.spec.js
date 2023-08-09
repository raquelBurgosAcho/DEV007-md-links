
import axios from 'axios';
import fs from 'fs';



import { absPath, transformPath, getHttpResponse,getStatsResult, getResultValidateStats, isThisADirectory, isThisAMDFile } from '../index';
//import axios from 'axios';
import path from 'path';


jest.mock('axios');
jest.mock('fs');




describe('absPath', () => {
  it('should correctly identify an absolute path', () => {
    const absolutePath = 'C:/Users/DELL/Desktop/mdlink/DEV007-md-links/prueba1/archivo.md';
    expect(absPath(absolutePath)).toBe(true);
  });

  it('should correctly identify a relative path', () => {
    const relativePath = 'prueba1';
    expect(absPath(relativePath)).toBe(false);
  });
});

describe('transformPath',() =>{
  it('should transform a relative path to an absolute path',() =>{
    const relativePath = 'prueba1'
    const expectedAbsolutePath = path.resolve(relativePath);
  expect(transformPath(relativePath)).toBe(expectedAbsolutePath)
  })
  
    it('should not change an already absolute path', () => {
      const absolutePath = 'C:\\Users\\DELL\\Desktop\\mdlink\\DEV007-md-links\\prueba1\\archivo.md';
      expect(transformPath(absolutePath)).toBe(absolutePath);
    });
  }); 
  
  describe('getHttpResponse', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return an array with the same length as the input', async () => {
      const input = [
        { href: 'http://example.com' },
        { href: 'http://another-example.com' }
      ];
      axios.get.mockResolvedValue({ status: 200 });
  
      const result = await getHttpResponse(input);
  
      expect(result).toHaveLength(input.length);
    });
  
    it('should attach status and ok properties to the elements', async () => {
      const input = [{ href: 'http://example.com' }];
      axios.get.mockResolvedValue({ status: 200 });
  
      const [result] = await getHttpResponse(input);
  
      expect(result).toHaveProperty('status', 200);
      expect(result).toHaveProperty('ok', 'Ok');
    });
  
    it('should handle successful and failed requests', async () => {
      const successfulResponse = { status: 200 };
      const error = { response: { status: 404 } };
      const input = [
        { href: 'http://successful-request.com' },
        { href: 'http://failed-request.com' },
      ];
  
      axios.get
        .mockResolvedValueOnce(successfulResponse)
        .mockRejectedValueOnce(error);
  
      const results = await getHttpResponse(input);
  
      expect(results[0]).toHaveProperty('status', 200);
      expect(results[0]).toHaveProperty('ok', 'Ok');
  
      expect(results[1]).toHaveProperty('status', 404);
      expect(results[1]).toHaveProperty('ok', 'Fail');
    });
  });

  describe('getStatsResult', () => {
    it('should return the correct stats for an array with unique links', () => {
      const input = [
        { href: 'https://example.com' },
        { href: 'https://another-example.com' }
      ];
      const expectedStats = {
        Total: 2,
        Unique: 2,
      };
  
      const result = getStatsResult(input);
  
      expect(result).toEqual(expectedStats);
    });
  
    it('should return the correct stats for an array with duplicate links', () => {
      const input = [
        { href: 'https://example.com' },
        { href: 'https://example.com' },
        { href: 'https://another-example.com' }
      ];
      const expectedStats = {
        Total: 3,
        Unique: 2,
      };
  
      const result = getStatsResult(input);
  
      expect(result).toEqual(expectedStats);
    });
  
    it('should return the correct stats for an empty array', () => {
      const input = [];
      const expectedStats = {
        Total: 0,
        Unique: 0,
      };
  
      const result = getStatsResult(input);
  
      expect(result).toEqual(expectedStats);
    });
  });
  describe('getResultValidateStats', () => {
    it('should return the correct stats for an array with unique links and no broken links', () => {
      const input = [
        { href: 'https://example.com', ok: 'Ok' },
        { href: 'https://another-example.com', ok: 'Ok' }
      ];
      const expectedStats = {
        Total: 2,
        Unique: 2,
        Broken: 0,
      };
  
      const result = getResultValidateStats(input);
  
      expect(result).toEqual(expectedStats);
    });
  
    it('should return the correct stats for an array with duplicate links and some broken links', () => {
      const input = [
        { href: 'https://example.com', ok: 'Fail' },
        { href: 'https://example.com', ok: 'Ok' },
        { href: 'https://another-example.com', ok: 'Fail' }
      ];
      const expectedStats = {
        Total: 3,
        Unique: 2,
        Broken: 2,
      };
  
      const result = getResultValidateStats(input);
  
      expect(result).toEqual(expectedStats);
    });
  
    it('should return the correct stats for an empty array', () => {
      const input = [];
      const expectedStats = {
        Total: 0,
        Unique: 0,
        Broken: 0,
      };
  
      const result = getResultValidateStats(input);
  
      expect(result).toEqual(expectedStats);
    });
  });

  describe('isThisADirectory', () => {
    it('should return true for a directory path', () => {
      // Mock fs.statSync to return a directory-like object
      fs.statSync.mockReturnValue({ isDirectory: () => true });
  
      const result = isThisADirectory('/path/to/directory');
  
      expect(result).toBe(true);
    });
  
    it('should return false for a non-directory path', () => {
      // Mock fs.statSync to return a non-directory-like object
      fs.statSync.mockReturnValue({ isDirectory: () => false });
  
      const result = isThisADirectory('/path/to/file.txt');
  
      expect(result).toBe(false);
    });
  });
  describe('isThisAMDFile', () => {
    it('deberia retornar true para archivo con extension .md', () => {
      const filePath = 'file.md';
      const result = isThisAMDFile(filePath);
      expect(result).toBe(true);
    });
  
    it('should return false for archivo sin extension .md', () => {
      const filePath = 'archivo.txt';
      const result = isThisAMDFile(filePath);
      expect(result).toBe(false);
    });
  });